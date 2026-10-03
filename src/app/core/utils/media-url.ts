import { environment } from '../../../environments/environment';

// "/uploads/abc.jpg" → "http://localhost:3000/uploads/abc.jpg"
export function mediaUrl(path?: string | null): string {
    return path ? `${environment.apiUrl}${path}` : '';
}
