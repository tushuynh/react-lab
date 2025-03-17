/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Store } from '@/types/store';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createCartSlice } from './cart-slice';
import { createUserSlice } from './user-slice';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...rest) => ({
          ...createUserSlice(
            // @ts-expect-error
            ...rest,
          ),
          ...createCartSlice(
            // @ts-expect-error
            ...rest,
          ),
        })),
      ),
      {
        name: 'local-storage',
      },
    ),
  ),
);
