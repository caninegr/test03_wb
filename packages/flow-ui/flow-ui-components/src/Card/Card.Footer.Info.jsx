import React from 'react'
import { Text } from 'theme-ui'
import TextList from '@components/TextList'
import { FaRegClock } from 'react-icons/fa'
import rv from '@components/utils/buildResponsiveVariant'

const CardFooterInfo = ({ variant, date, timeToRead }) => (
  <TextList nowrap>
    {/* {date && <Text sx={{ variant: rv(variant, 'date') }}>{date}</Text>} */}
    {date && <Text sx={{ variant: rv(variant, 'date') }}>
      {new Date(date).toLocaleDateString('el-GR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
      </Text>}



    {timeToRead && (
      <Text sx={{ variant: rv(variant, 'timeToRead') }}>
        <FaRegClock css={{ verticalAlign: `middle` }} /> {timeToRead} '
      </Text>
    )}
  </TextList>
)

export default CardFooterInfo
