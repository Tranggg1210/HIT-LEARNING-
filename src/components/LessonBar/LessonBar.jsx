import { Box, Typography } from '@mui/material'
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react'
import './LessonBar.scss'
import { useEffect, useState } from 'react'
import { getSectionByCourseId } from '../../apis/section.api'
import { getItemBySectionId } from '../../apis/item.api'
import { NavLink } from 'react-router-dom'

const LessonBar = (param) => {
  const [sections, setSections] = useState({}) 
  const [items, setItems] = useState({}) 
  const [openSection, setOpenSection] = useState(null)

  // console.log('result param: ', param)

  const showAllSection = async () => {
    const result = await (await getSectionByCourseId(param?.param.lessonId)).data.data
    // console.log('result lesson bar: ', result.content)

    const sectionsObject = result.content.reduce((acc, section) => {
      acc[section.id] = section
      return acc
    }, {})

    setSections(sectionsObject)
    // console.log('lesson bar: ', sectionsObject)
  }

  const showItemsBySectionId = async (sectionId) => {
    const res = await getItemBySectionId(sectionId)
    setItems(prevItems => ({
      ...prevItems,
      [sectionId]: res.data.data
    }))
    console.log(`Items for section ${sectionId}: `, res.data.data)
  }

  const handleToggle = (index, sectionId) => {
    const newOpenSection = openSection === index ? null : index
    setOpenSection(newOpenSection)
    if (newOpenSection !== null && !items[sectionId]) {
      showItemsBySectionId(sectionId)
      // console.log('item[sectionid]>>>>',items[sectionId])
      // console.log(sectionId)
    }
  }

  useEffect(() => {
    showAllSection()
  }, [])

  return (
    <>
      <Box m={2}>
        <Typography variant='h4' component='h2' style={{}} align='center'>
          Nội dung khóa học
        </Typography>
      </Box>
      <div className='lesson-content'>
        <br />
        {Object.keys(sections).map((sectionId, index) => (
          <div key={sectionId} className='section'>
            <div className='section-header' onClick={() => handleToggle(index, sectionId)}>
              <div className='title'>
                <span>{sections[sectionId].name}</span>
                <span className='arrow'>
                  {openSection === index ? <IconChevronUp /> : <IconChevronDown />}
                </span>
              </div>
            </div>
            {openSection === index && (
              <div className='section-content'>
                {Array.isArray(items[sectionId]) ? items[sectionId].map((item) => (
                  <div key={item.id} className='lesson'>
                    <NavLink to={'/'}>{item.description}</NavLink>
                  </div>
                )) : <div>Updating....</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default LessonBar
