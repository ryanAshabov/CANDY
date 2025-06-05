export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string;
          price: number;
          inventory: number;
          image_url: string;
          category: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description: string;
          price: number;
          inventory: number;
          image_url?: string;
          category: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string;
          price?: number;
          inventory?: number;
          image_url?: string;
          category?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          status: string;
          total: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          status: string;
          total: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          status?: string;
          total?: number;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
        };
      };
      promotions: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string;
          start_date: string;
          end_date: string;
          discount_percent: number;
          active: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description: string;
          start_date: string;
          end_date: string;
          discount_percent: number;
          active?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string;
          start_date?: string;
          end_date?: string;
          discount_percent?: number;
          active?: boolean;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          avatar_url: string;
          role: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name: string;
          avatar_url?: string;
          role?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string;
          avatar_url?: string;
          role?: string;
        };
      };
    };
  };
}