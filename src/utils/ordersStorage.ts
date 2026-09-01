import { Order, OrderStatus } from '../types';
import { INITIAL_MOCK_ORDERS } from '../data/mockOrders';

const ORDERS_STORAGE_KEY = 'genz_studio_user_orders_v2';

export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error('Failed to parse orders from localStorage', err);
    return [];
  }
}

export function saveNewOrder(order: Order): Order[] {
  try {
    const current = getStoredOrders();
    const updated = [order, ...current];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('genz-orders-updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Failed to save order to localStorage', err);
    return [order];
  }
}

export function getOrderStepIndex(status: OrderStatus): number {
  switch (status) {
    case 'confirmed':
      return 1;
    case 'preparing':
      return 2;
    case 'dispatched':
      return 3;
    case 'out_for_delivery':
      return 4;
    case 'delivered':
      return 5;
    default:
      return 1;
  }
}
