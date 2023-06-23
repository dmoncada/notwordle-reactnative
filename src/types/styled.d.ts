import "styled-components/native";
import { Theme } from "../lib/Theme";

declare module "styled-components/native" {
  export interface DefaultTheme extends Theme {}
}
