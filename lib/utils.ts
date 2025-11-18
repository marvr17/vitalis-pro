import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function getScoreColor(score: number): string {
  if (score >= 4.5) return 'text-green-600';
  if (score >= 4.0) return 'text-green-500';
  if (score >= 3.5) return 'text-yellow-500';
  if (score >= 3.0) return 'text-yellow-600';
  if (score >= 2.0) return 'text-red-500';
  return 'text-red-600';
}

export function getScoreBadge(score: number): string {
  if (score >= 4.0) return '🟢';
  if (score >= 3.0) return '🟡';
  return '🔴';
}

export function getScoreLabel(score: number): string {
  if (score >= 4.5) return 'Excelente';
  if (score >= 4.0) return 'Muy bueno';
  if (score >= 3.5) return 'Bueno';
  if (score >= 3.0) return 'Regular';
  if (score >= 2.0) return 'Malo';
  return 'Crítico';
}
