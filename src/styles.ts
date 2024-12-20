import { createGlobalStyle, css } from "styled-components";
import { StyleCustomizations } from "./types";

export const GlobalStyle = createGlobalStyle`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export const getCustomStyles = (
  theme: any = {},
  customizations: StyleCustomizations = {}
) => css`
  --primary-color: ${customizations.primaryColor ||
  theme.primaryColor ||
  "#007bff"};
  --secondary-color: ${customizations.secondaryColor ||
  theme.secondaryColor ||
  "#6c757d"};
  --background-color: ${customizations.backgroundColor ||
  theme.backgroundColor ||
  "#ffffff"};
  --text-color: ${customizations.textColor || theme.textColor || "#333333"};
  --font-family: ${customizations.fontFamily ||
  theme.fontFamily ||
  "Arial, sans-serif"};
  --border-radius: ${customizations.borderRadius ||
  theme.borderRadius ||
  "8px"};
  --animation-duration: ${theme.animationDuration || "0.3s"};

  font-family: var(--font-family);
  color: var(--text-color);
  background-color: var(--background-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn var(--animation-duration) ease-out,
    slideIn var(--animation-duration) ease-out;
`;
