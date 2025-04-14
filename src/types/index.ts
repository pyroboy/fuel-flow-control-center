
// Enums
export enum UserRole {
  Admin = 'admin',
  OfficeStaff = 'office_staff',
  DepotStaff = 'depot_staff',
  GSO = 'gso',
  GSOStaff = 'gso_staff'
}

export enum RegistrationStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected'
}

export enum TruckStatus {
  Available = 'available',
  Unavailable = 'unavailable',
  Disabled = 'disabled',
  OutForDelivery = 'out_for_delivery'
}

export enum OrderType {
  Delivery = 'delivery',
  Pickup = 'pickup'
}

export enum OrderStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Scheduled = 'scheduled',
  OutForDelivery = 'out_for_delivery',
  Delivered = 'delivered',
  ReadyForPickup = 'ready_for_pickup',
  PickedUp = 'picked_up',
  Cancelled = 'cancelled'
}

export enum PaymentMethod {
  Cash = 'cash',
  Cheque = 'cheque'
}

export enum PaymentStatus {
  Pending = 'pending',
  Completed = 'completed'
}

export enum InventoryChangeType {
  Replenishment = 'replenishment',
  SaleDelivery = 'sale_delivery',
  SalePickup = 'sale_pickup',
  AdjustmentPositive = 'adjustment_positive',
  AdjustmentNegative = 'adjustment_negative'
}

export enum DeliveryRunStatus {
  Scheduled = 'scheduled',
  OutForDelivery = 'out_for_delivery',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

// Interfaces
export interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole;
  is_active: boolean;
  registration_status?: RegistrationStatus | null;
  assigned_station_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface GasStation {
  id: string;
  owner_id: string;
  name: string;
  address: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface FuelType {
  id: string;
  name: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface FuelPrice {
  id: string;
  fuel_type_id: string;
  delivery_price_per_liter: number;
  pickup_price_per_liter: number;
  effective_from: string;
  set_by_user_id: string;
  created_at: string;
}

export interface Truck {
  id: string;
  plate_number: string;
  capacity_liters: number;
  status: TruckStatus;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  gas_station_id: string;
  placed_by_user_id: string;
  order_type: OrderType;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_details?: string | null;
  payment_status: PaymentStatus;
  internal_notes?: string | null;
  flags?: string[] | null;
  confirmed_by_user_id?: string | null;
  payment_verified_by_user_id?: string | null;
  pickup_scheduled_datetime?: string | null;
  pickup_ready_by_user_id?: string | null;
  pickup_completed_datetime?: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  fuel_type_id: string;
  quantity_liters: number;
  price_per_liter_at_order: number;
}

export interface DeliveryRun {
  id: string;
  truck_id: string;
  scheduled_by_user_id: string;
  scheduled_datetime: string;
  status: DeliveryRunStatus;
  departure_time?: string | null;
  completion_time?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DeliveryRunOrder {
  delivery_run_id: string;
  order_id: string;
}

export interface InventoryAdjustment {
  id: string;
  fuel_type_id: string;
  quantity_adjusted_liters: number;
  reason: string;
  adjusted_by_user_id: string;
  adjustment_timestamp: string;
}
