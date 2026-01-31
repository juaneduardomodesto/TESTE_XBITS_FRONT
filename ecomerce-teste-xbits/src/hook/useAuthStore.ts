import { LoginRequest, UserRegisterRequest, authService, imageService } from '@/business';
import { EEntityType } from '@/business/enums';
import { create } from 'zustand';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  userIdentifier: string | null;
  user: User | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: UserRegisterRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  loadUserProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: authService.isAuthenticated(),
  userIdentifier: authService.getUserIdentifier(),
  user: null,

  login: async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);
    
    if (response.name) {
      localStorage.setItem('userName', response.name);
    }
    localStorage.setItem('userEmail', credentials.email || '');
    
    set({
      isAuthenticated: true,
      userIdentifier: response.userIdentifier,
      user: {
        name: response.name || 'Usuário',
        email: credentials.email || '',
        avatar: undefined
      }
    });
    
    await get().loadUserProfile();
  },

  register: async (data: UserRegisterRequest) => {
    await authService.register(data);
  },

  logout: () => {
    authService.logout();

    import('./useCartStore').then(({ useCartStore }) => {
      useCartStore.setState({ 
        cart: null, 
        loading: false,
        initialized: false 
      });
    });

    import('./useOrderStore').then(({ useOrderStore }) => {
      useOrderStore.getState().reset();
    });
    
    set({ isAuthenticated: false, userIdentifier: null, user: null });
  },

  checkAuth: () => {
    const isAuth = authService.isAuthenticated();
    set({
      isAuthenticated: isAuth,
      userIdentifier: authService.getUserIdentifier()
    });
    
    if (isAuth && !get().user) {
      get().loadUserProfile();
    }
  },

  loadUserProfile: async () => {
    try {
      const userIdentifier = authService.getUserIdentifier();
      if (!userIdentifier) return;

      const userId = parseInt(userIdentifier);
      let avatarUrl: string | undefined;
      try {
        const mainImage = await imageService.getMainImage(EEntityType.User, userId);
        if (mainImage) {
          avatarUrl = mainImage.thumbnailUrl || mainImage.originalUrl || undefined;
        }
      } catch (error) {
        console.warn('Erro ao carregar avatar do usuário:', error);
      }

      const email = localStorage.getItem('userEmail') || 'user@example.com';
      const name = localStorage.getItem('userName') || 'Usuário';

      set({
        user: {
          name,
          email,
          avatar: avatarUrl
        }
      });
    } catch (error) {
      console.error('Erro ao carregar perfil do usuário:', error);
    }
  }
}));