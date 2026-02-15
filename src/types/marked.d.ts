// Type definitions for marked
declare module "marked" {
  export interface MarkedOptions {
    gfm?: boolean;
    breaks?: boolean;
    renderer?: Renderer;
  }

  export class Renderer {
    image: (href: any, title: any, text: any) => string;
    code(code: string, language: string | undefined): string;
    heading(text: string, level: number): string;
  }

  export const marked: {
    (src: string): string;
    setOptions(options: MarkedOptions): void;
    use(options: { renderer: Renderer }): void;
    parse(src: string): string;
    Renderer: typeof Renderer;
  };
}
