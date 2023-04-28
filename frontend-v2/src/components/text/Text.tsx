import React, { CSSProperties, ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";

type AllowedElements = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
type DisplayTypes = "block" | "initial" | "inline";
type TextAlignTypes = "left" | "center" | "right";

type TextProps = {
  component?: AllowedElements;
  children?: ReactNode;
  display?: DisplayTypes;
  noMargin?: boolean;
  fontSize?: string;
  lineHeight?: string;
  align?: TextAlignTypes;
  bold?: boolean;
  style?: CSSProperties;
  color?: string;
  width?: string;
  autofocus?: boolean;
  [propName: string]: any;
};

/**
 * This text component maps the prop to a variant of HTML element types
 *
 * Defaults to `<p>` if not defined
 *
 * Available properties:
 *  secondary
 *  display
 *  noMargin
 *  align
 *  fontSize
 *  bold
 *  color
 *  style
 *  width
 *
 * Allowed Elements:
 *  h1,
 *  h2,
 *  h3,
 *  h4,
 *  h5,
 *  h6,
 *  p
 */
const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    { component = "p", children = null, autofocus = false, style, ...props },
    textRef
  ) => {
    const innerRef = useRef<HTMLElement>(null);
    useEffect(() => {
      if (autofocus) {
        // eslint-disable-next-line no-unused-expressions
        innerRef.current?.focus();
      }
    }, [autofocus]);

    return (
      <TextBase
        as={component}
        {...props}
        style={{ ...style, outline: `${autofocus ? "none" : ""}` }}
        ref={textRef || innerRef}
        tabIndex={autofocus ? -1 : null}
      >
        {children}
      </TextBase>
    );
  }
);

const TextBase = styled("p")<TextProps>`
  display: ${(props: TextProps) => props.display || "block"};
  margin: ${(props: TextProps) => (props.noMargin ? "0" : "")};
  color: ${(props: TextProps) => (props.color ? props.color : "black")};
  text-align: ${(props: TextProps) => props.align || "left"};
  font-size: ${(props: TextProps) => props.fontSize || "1rem"};
  font-weight: ${(props: TextProps) => (props.bold ? "bold" : "normal")};
  width: ${(props: TextProps) => (props.width ? props.width : "auto")};
  line-height: ${(props: TextProps) => props.lineHeight || "1.25rem"};
`;

export default Text;
