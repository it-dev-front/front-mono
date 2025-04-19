import React, { ComponentProps, JSX, ReactElement } from "react";
import styles from "./Typograpy.module.css";
import clsx from "clsx";

export type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "caption";
export type FontWeightType = 100 | 300 | 400 | 500 | 600 | 700;
export type FontSizeType = 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type FontColorType = "black" | "white";
export type LetterSpacing = "-2" | "-1.5" | "-1" | "-0.5" | "1";
export type LineHeight = 18 | 20 | 22 | 24 | 26 | 28 | 30 | 32 | 34;
export type FontFamilyType = "nexon-gothic" | "noto-sans";
export interface TypographyProps extends ComponentProps<"p"> {
  variant?: Variant;
  fontWeight?: FontWeightType;
  fontSize?: FontSizeType;
  color?: FontColorType;
  letterSpacing?: LetterSpacing;
  lineHeight?: LineHeight;
  fontFamily?: FontFamilyType;
  as?: keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
}

const element: { [key in Variant]: string } = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  p: "p",
  caption: "caption",
};

function baseElement(props: TypographyProps) {
  const {
    className,
    variant = "p",
    fontWeight = 300,
    fontSize = 16,
    fontFamily = "noto-sans",
    color = "white",
    lineHeight = 18,
    letterSpacing = "-0.5",
    children,
    as,
    ...rest
  } = props;

  const fontClass = clsx(
    fontFamily === "noto-sans" && styles.notoSans,
    fontFamily === "nexon-gothic" && styles.nexonGothic,
    className
  );

  return React.createElement(
    as || element[variant],
    {
      className: fontClass,
      style: {
        color,
        fontWeight,
        fontSize: `min(5vw, ${fontSize}px)`,
        lineHeight: `${lineHeight}px`,
        letterSpacing: `${letterSpacing}px`,
      },
      ...rest,
    },
    children
  );
}

export const Typography = (props: TypographyProps): ReactElement => {
  return React.createElement(baseElement, props);
};
