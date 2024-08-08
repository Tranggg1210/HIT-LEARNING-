import './LessonBar.scss'
import { Box, Typography } from '@mui/material'
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { getSectionByCourseId } from '../../apis/section.api'
import { getItemBySectionId } from '../../apis/item.api'
import { NavLink } from 'react-router-dom'

const LessonBar = ({ param }) => {
  console.log('param lessonbar',param)
  const [sections, setSections] = useState({})
  const [items, setItems] = useState({})
  const [openSection, setOpenSection] = useState(null)

  const showAllSection = async () => {
    const result = await (await getSectionByCourseId(param)).data.data
    console.log('>>>result',result)

    const sectionsObject = result.content.reduce((acc, section) => {
      acc[section.id] = section
      return acc
    }, {})

    // setSections(sectionsObject)
    console.log('>>>sections',sections)
  }

  const showItemsBySectionId = async (sectionId) => {
    const res = await getItemBySectionId(sectionId)
    setItems((prevItems) => ({
      ...prevItems,
      [sectionId]: res.data.data.content,
    }))
  }

  useEffect(() => {
    showAllSection()
  }, [param])

  const handleToggle = (index, sectionId) => {
    const newOpenSection = openSection === index ? null : index
    setOpenSection(newOpenSection)
    if (newOpenSection !== null && !items[sectionId]) {
      showItemsBySectionId(sectionId)
    }
  }

  return (
    <>
      <Box m={2}>
        <Typography variant='h4' component='h2' align='center'>
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
                {Array.isArray(items[sectionId]) ? (
                  items[sectionId].map((item) => (
                    <div key={item.id} className='lesson'>
                      <NavLink to={`/lesson/${item.id}`}>
                        {item.name} - {item.id}
                      </NavLink>
                    </div>
                  ))
                ) : (
                  <div>Updating....</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default LessonBar
