import { AriaColorSliderOptions, useColorSlider } from '@react-aria/color'
import { useFocusRing } from '@react-aria/focus'
import { useLocale } from '@react-aria/i18n'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useColorSliderState } from '@react-stately/color'
import { useRef } from 'react'

const TRACK_THICKNESS = 28
const THUMB_SIZE = 20

type Props = Omit<AriaColorSliderOptions, 'trackRef' | 'inputRef'> & {
  className?: string
  width?: string | number
  height?: string | number
}

export const ColorSlider = ({
  className,
  width = 300,
  height = 28,
  ...props
}: Props) => {
  const { locale } = useLocale()
  const state = useColorSliderState({ ...props, locale })
  const trackRef = useRef(null)
  const inputRef = useRef(null)

  const { trackProps, thumbProps, inputProps } = useColorSlider(
    {
      ...props,
      trackRef,
      inputRef,
    },
    state,
  )

  const { focusProps, isFocusVisible } = useFocusRing()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width,
      }}
      className={className}
    >
      {/* The track element holds the visible track line and the thumb. */}
      <div
        {...trackProps}
        ref={trackRef}
        style={{
          ...trackProps.style,
          height,
          width: '100%',
          borderRadius: 4,
        }}
      >
        <div
          {...thumbProps}
          style={{
            ...thumbProps.style,
            top: TRACK_THICKNESS / 2,
            border: '2px solid white',
            boxShadow: '0 0 0 1px black, inset 0 0 0 1px black',
            width: isFocusVisible ? TRACK_THICKNESS + 4 : THUMB_SIZE,
            height: isFocusVisible ? TRACK_THICKNESS + 4 : THUMB_SIZE,
            borderRadius: '50%',
            boxSizing: 'border-box',
            background: state.getDisplayColor().toString('css'),
          }}
        >
          <VisuallyHidden>
            <input ref={inputRef} {...inputProps} {...focusProps} />
          </VisuallyHidden>
        </div>
      </div>
    </div>
  )
}
