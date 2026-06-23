import type { SunoTrack } from '@/lib/suno';

type SunoResult = { track: SunoTrack; status: string };

// Module-level Map: sobrevive pela vida do processo do servidor Next.js
export const sunoResults = new Map<string, SunoResult>();
