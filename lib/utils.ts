import { type ClassValue, clsx } from 'clsx'

/**
 * Utility function to merge class names
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}

/**
 * Format currency in HNL
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-HN', {
        style: 'currency',
        currency: 'HNL',
        minimumFractionDigits: 2,
    }).format(amount)
}

/**
 * Format date
 */
export function formatDate(date: Date | string): string {
    return new Intl.DateTimeFormat('es-HN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date))
}

/**
 * Calculate ROI percentage
 */
export function calculateROI(revenue: number, cost: number): number {
    if (cost === 0) return 0
    return ((revenue - cost) / cost) * 100
}

/**
 * Get platform color
 */
export function getPlatformColor(platform: string): string {
    const colors: Record<string, string> = {
        facebook: '#1877F2',
        instagram: '#E4405F',
        tiktok: '#000000',
    }
    return colors[platform.toLowerCase()] || '#F7931A'
}

/**
 * Get status badge class
 */
export function getStatusBadgeClass(status: string): string {
    const statusClasses: Record<string, string> = {
        pendiente: 'badge-primary',
        en_produccion: 'badge-warning',
        entregado: 'badge-success',
        cancelado: 'badge-danger',
    }
    return statusClasses[status] || 'badge-primary'
}
