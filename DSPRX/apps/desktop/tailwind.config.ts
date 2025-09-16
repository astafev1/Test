import type { Config } from 'tailwindcss';
export default <Partial<Config>>({ content: ['./src/renderer/**/*.{ts,tsx,html}'], theme: { extend: { colors: { primary: '#1E68FF', primaryDark: '#0B5FFF', ink: '#0F1C2E', line: '#E6ECF2' } } } });
