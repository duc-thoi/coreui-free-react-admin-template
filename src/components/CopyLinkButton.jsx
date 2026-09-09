import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCopy, cilCheckAlt } from '@coreui/icons'

/**
 * CopyLinkButton
 *
 * Small, subtle button that copies a link string to the clipboard and briefly
 * confirms the copy. Designed to sit on colored widget-card footers, so it
 * defaults to a ghost style with white text.
 *
 * @param {Object} props
 * @param {string} props.link - The string written to the clipboard on click.
 * @param {string} [props.label] - Idle button label (default "Copy link").
 * @param {string} [props.describe] - Short name of what the link points to,
 *   used only to build a descriptive aria-label (e.g. "Users widget").
 * @param {string} [props.className] - Extra classes for the button.
 */
const CopyLinkButton = ({ link, label = 'Copy link', describe, className }) => {
  // 'idle' | 'copied' | 'error'
  const [status, setStatus] = useState('idle')
  const timerRef = useRef(null)

  // Clean up the revert timer if the component unmounts mid-feedback.
  useEffect(() => () => clearTimeout(timerRef.current), [])

  const flash = (next) => {
    setStatus(next)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setStatus('idle'), 1500)
  }

  const fallbackCopy = () => {
    // execCommand fallback for non-secure contexts where navigator.clipboard
    // is unavailable.
    try {
      const textarea = document.createElement('textarea')
      textarea.value = link
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(textarea)
      flash(ok ? 'copied' : 'error')
    } catch {
      flash('error')
    }
  }

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(
        () => flash('copied'),
        () => fallbackCopy(),
      )
    } else {
      fallbackCopy()
    }
  }

  const idleLabel = describe ? `Copy link to ${describe}` : label
  const ariaLabel =
    status === 'copied' ? 'Link copied' : status === 'error' ? "Couldn't copy link" : idleLabel
  const text = status === 'copied' ? 'Copied!' : status === 'error' ? "Couldn't copy" : label

  return (
    <CButton
      type="button"
      color="transparent"
      size="sm"
      className={`text-white p-0 d-inline-flex align-items-center ${className || ''}`.trim()}
      onClick={handleCopy}
      aria-label={ariaLabel}
    >
      <CIcon icon={status === 'copied' ? cilCheckAlt : cilCopy} className="me-1" size="sm" />
      <span aria-hidden="true">{text}</span>
      <span className="visually-hidden" role="status" aria-live="polite">
        {status === 'copied' ? 'Link copied' : status === 'error' ? "Couldn't copy link" : ''}
      </span>
    </CButton>
  )
}

CopyLinkButton.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string,
  describe: PropTypes.string,
  className: PropTypes.string,
}

export default CopyLinkButton
