const mockSetTheme = jest.fn();
const useTheme = jest.fn().mockImplementation(() => ["light", mockSetTheme]);
const THhemeProvider = "";

export { useTheme, THhemeProvider };
