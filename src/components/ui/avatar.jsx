"use client"

import * as React from "react"
import BoringAvatar from "boring-avatars"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef(({ className, size = 40, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    style={{ height: size, width: size }}
    {...props}
  />
))
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef(({ className, alt, src, ...props }, ref) => {
  if (src) {
    return (
      <img
        ref={ref}
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn("aspect-square h-full w-full", className)}
        {...props}
      />
    )
  }
  return null
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef(
  ({ className, children, name, variant = "beam", colors, square = false, size, ...props }, ref) => {
    // Get size from parent Avatar if not explicitly provided
    const avatarSize = size || (props.style?.width ? Number(props.style.width) : 40)

    // If name is provided, use BoringAvatar
    if (name) {
      return (
        <div ref={ref} className={cn("h-full w-full", className)} {...props}>
          <BoringAvatar
            size={avatarSize}
            name={name}
            variant={variant}
            colors={colors || ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            square={square}
          />
        </div>
      )
    }

    // Otherwise use the children as fallback (like initials)
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-zinc-900 text-zinc-50",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
