import { Typography } from '@mui/material';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import './LessonBar.scss'
import { useState } from 'react';


const sections = [
    {
      title: '1. Giới thiệu',
      lessons: [
        { name: '1. Giới thiệu', duration: '6:00' },
        { name: '2. ReactJS là gì', duration: '6:00' },
        { name: '3. Giới thiệu', duration: '6:00' },
      ],
    },
    { title: '2. Bài 2', lessons: [
        { name: '1. Giới thiệu', duration: '6:00' },
        { name: '2. ReactJS là gì', duration: '6:00' },
        { name: '3. Giới thiệu', duration: '6:00' },
        { name: '1. Giới thiệu', duration: '6:00' },
        { name: '2. ReactJS là gì', duration: '6:00' },
        { name: '3. Giới thiệu', duration: '6:00' },
        { name: '1. Giới thiệu', duration: '6:00' },
        { name: '2. ReactJS là gì', duration: '6:00' },
        { name: '3. Giới thiệu', duration: '6:00' },
        { name: '1. Giới thiệu', duration: '6:00' },
        { name: '2. ReactJS là gì', duration: '6:00' },
        { name: '3. Giới thiệu', duration: '6:00' },
    ] },
    { title: '3. Bài 3', lessons: [] },
    { title: '4. Bài 4', lessons: [] },
    { title: '5. Bài 5', lessons: [] },
    { title: '6. Bài 6', lessons: [] },
    { title: '3. Bài 3', lessons: [] },
    { title: '4. Bài 4', lessons: [] },
    { title: '5. Bài 5', lessons: [] },
    { title: '6. Bài 6', lessons: [] },
    { title: '3. Bài 3', lessons: [] },
    { title: '4. Bài 4', lessons: [] },
    { title: '5. Bài 5', lessons: [] },
    { title: '6. Bài 6', lessons: [] },
    { title: '3. Bài 3', lessons: [] },
    { title: '4. Bài 4', lessons: [] },
    { title: '5. Bài 5', lessons: [] },
    { title: '6. Bài 6', lessons: [] },
];
const LessonBar = () => {
    const [openSection, setOpenSection] = useState(null);

    const handleToggle = (index) => {
        setOpenSection(openSection === index ? null : index);
    };
    return (
        <div className="lesson-content">
          <Typography variant="h4" component="h2">Nội dung khóa học</Typography>
          <br />
          {sections.map((section, index) => (
            <div key={index} className="section">
              <div className="section-header" onClick={() => handleToggle(index)}>
                <div className="title">
                  <span>{section.title}</span>
                  <span className="arrow">{openSection === index ? <IconChevronUp/> : <IconChevronDown/>}</span>
                </div>
              </div>
              {openSection === index && (
                <div className="section-content">
                  {section.lessons.map((lesson, idx) => (
                    <div key={idx} className="lesson">
                      <span>{lesson.name}</span>
                      <span className="duration">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );
}



export default LessonBar