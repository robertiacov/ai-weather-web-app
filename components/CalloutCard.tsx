'use client'
import React from 'react'

import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/solid'
import { Callout } from "@tremor/react"

type Props = {
    message: string;
    warning?: boolean;
}

const CalloutCard = ({message, warning}: Props) => {
  return (
    <div>CalloutCard</div>
  )
}

export default CalloutCard