export const APP_NAME = "AI가 만드는 사설";

export interface Editorial {
  id: string;
  title: string;
  content: string;
  difficulty: "LEVEL_1" | "LEVEL_2" | "LEVEL_3";
}
