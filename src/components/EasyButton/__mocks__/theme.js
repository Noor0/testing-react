const mockSetTheme = jest.fn();
const useTheme = jest.fn().mockImplementation(() => ["light", mockSetTheme]);
const ThemeProvider = "";

export { useTheme, ThemeProvider };
