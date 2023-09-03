import React from "react";
import { GlassWrapper } from "./Glass.styles";

export default function Glass({ children }: { children: React.ReactNode }) {
    return (
        <GlassWrapper>
            {children}
        </GlassWrapper>
    )
}