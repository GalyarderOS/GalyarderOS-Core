import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Menjalankan cleanup (unmount komponen, dll.) secara otomatis setelah setiap tes.
afterEach(() => {
  cleanup();
}); 