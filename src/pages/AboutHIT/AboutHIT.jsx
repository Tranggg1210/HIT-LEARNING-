import React from 'react'
import './AboutHIT.scss'
import Logo1 from '../../assets/images/logo1.png'
import Banner from '../../assets/images/birthday-2023.jpg'
import ChuNhiem1 from '../../assets/images/chu_nhiem.jpg'
import ChuNhiem2 from '../../assets/images/pcn_hoatdong.jpg'
import ChuNhiem3 from '../../assets/images/pcn_hoctap.jpg'
import Ban1 from '../../assets/images/training-development.png'
import Ban2 from '../../assets/images/events.png'
import Ban3 from '../../assets/images/communications.png'
import Ban4 from '../../assets/images/team-dev.png'
import Ban5 from '../../assets/images/design.png'
import Aboutus1 from '../../assets/images/aboutus1.jpg'
import Aboutus2 from '../../assets/images/aboutus2.jpg'
import Khoahoc1 from '../../assets/images/pngegg11.png'
import Khoahoc2 from '../../assets/images/pngegg12.png'
import Khoahoc3 from '../../assets/images/photoshop.png'
import Khoahoc4 from '../../assets/images/pngegg13.png'
import Khoahoc5 from '../../assets/images/pngegg14.png'
import Khoahoc6 from '../../assets/images/pngegg15.png'
import Khoahoc7 from '../../assets/images/pngegg16.png'
import Khoahoc8 from '../../assets/images/spring.png'
import Khoahoc9 from '../../assets/images/test.png'
import Khoahoc10 from '../../assets/images/pngegg16.png'
import Khoahoc11 from '../../assets/images/pngegg17.png'
import Khoahoc12 from '../../assets/images/pngegg18.png'
import Hoidap from '../../assets/images/team-building-hit14.png'
import FooterHL from '../../common/FooterHL/FooterHL'
import { IconCircleArrowDownFilled } from '@tabler/icons-react'

const AboutHIT = () => {
  return (
    <>
    
      <div className='container'>
        <header>
          <div className='logo'>
            <img src={Logo1} alt='' />
          </div>
          <ul>
            <li>
              <a href='#banchunhiem'>Ban chủ nhiệm </a>
            </li>
            <li>
              <a href='#cacban'> Các ban</a>
            </li>
            <li>
              <a href='#vechungtoi'>Về chúng tôi</a>
            </li>
            <li>
              <a href='#caclophoc'>Các lớp học</a>
            </li>
            <li>
              <a href='#hoidap'>Hỏi đáp </a>
            </li>
          </ul>
        </header>
        <div className='banner'>
          <div className='banner-tittle'>
            <h1>HIT - CLB Tin Học Trường Đại học Công Nghiệp Hà Nội</h1>
            <p>
              Câu lạc bộ Tin học HIT là CLB học thuật trực thuộc khoa công nghệ thông tin trường Đại
              học Công Nghiệp Hà Nội, được thành lập vào ngày 18/8/2010. Đây là môi trường kết nối,
              truyền lửa đam mê tới các sinh viên yêu thích học thuật, tạo nên hệ sinh thái riêng về
              môi trường học tập và phát triển.
            </p>
            <p>
              Tổ chức các khóa học định kỳ, các nhóm học tập dành cho sinh viên HaUI có đam mê với
              ngành CNTT nói chung và dành cho các thành viên của CLB Tin học HIT nói riêng, giúp
              các bạn giao lưu, học hỏi, trau dồi kỹ năng và phát triển bản thân.
            </p>
          </div>
          <div className='banner-img'>
            <img src={Banner} alt='' />
          </div>
        </div>
        <div className='banchunhiem' id='banchunhiem'>
          <div className='title'>BAN CHỦ NHIỆM</div>
          <div className='cards'>
            <div className='card'>
              <img src={ChuNhiem2} alt='' />
              <div className='card-content'>
                <p className='name'>Nguyễn Thu Hoài</p>
                <p className='position'>Phó chủ nhiệm hoạt động</p>
                <a href='https://www.facebook.com/thu.hoai.20112003' target='_blank'>
                  <i className='fa-brands fa-facebook'> </i>
                </a>
              </div>
            </div>
            <div className='card'>
              <img src={ChuNhiem1} alt='' />
              <div className='card-content'>
                <p className='name'>Nguyễn Tiến Kiên</p>
                <p className='position'>Chủ nhiệm</p>
                <a href='https://www.facebook.com/kien2372003' target='_blank'>
                  <i className='fa-brands fa-facebook'></i>
                </a>
              </div>
            </div>
            <div className='card'>
              <img src={ChuNhiem3} alt='' />
              <div className='card-content'>
                <p className='name'>Phạm Đình Tiến</p>
                <p className='position'>Phó chủ nhiệm học tập</p>
                <a href='https://www.facebook.com/phamdt2031' target='_blank'>
                  <i className='fa-brands fa-facebook'></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='cacban' id='cacban'>
          <h1 className='title'>CÁC BAN VÀ BỘ PHẬN CỦA CLB</h1>
          <div className='teams'>
            <div className='team'>
              <img src={Ban1} alt='' />
              <p>Ban Đào tạo và Phát triển</p>
            </div>
            <div className='team'>
              <img src={Ban2} alt='' />
              <p>Ban Sự kiện</p>
            </div>
            <div className='team'>
              <img src={Ban3} alt='' />
              <p>Ban Truyền thông</p>
            </div>
          </div>
          <div className='departments'>
            <div className='department'>
              <img src={Ban4} alt='' />
              <p>Bộ phận phát triển phần mềm - Team Dev</p>
            </div>
            <div className='department'>
              <img src={Ban5} alt='' />
              <p>Bộ phận giám sát chất lượng thiết kế</p>
            </div>
          </div>
        </div>
        <div className='vechungtoi' id='vechungtoi'>
          <h1>VỀ CHÚNG TÔI</h1>
          <div className='container-section'>
            <div className='image-container'>
              <img src={Aboutus1} alt='' />
            </div>
            <div className='section'>
              <div className='section-title'>
                <span className='highlight1'>HOẠT ĐỘNG CHỦ YẾU</span>
              </div>
              <div className='section-content'>
                <h2>Trao đổi kiến thức chuyên ngành</h2>
                <p>
                  Tổ chức các khóa học định kỳ, các nhóm học tập giúp các thành viên của CLB, sinh
                  viên HaUI có đam mê với ngành CNTT, muốn trau dồi kỹ năng của bản thân.
                </p>

                <div className='activity-container'>
                  <div className='activity-item'>
                    <p className='highlight'>20+</p>
                    <p>Số lượng lớp và nhóm học được mở ra và đào tạo trong năm của CLB.</p>
                  </div>
                  <div className='activity-item'>
                    <p className='highlight'>600+</p>
                    <p>Số lượng thành viên CLB đã tham gia quá trình học tập, đào tạo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='container-section1'>
            <div className='section1'>
              <div className='section-title1'>
                <span className='highlight1'>HOẠT ĐỘNG NGOẠI KHÓA</span>
              </div>
              <div className='section-content1'>
                <h2>Offline hàng tháng, tổ chức team building, các sự kiện năm học của CLB...</h2>
                <p>
                  Các thành viên trong CLB không chỉ quen biết nhau qua lớp học mà còn hiểu nhau hơn
                  qua các buổi team building và cùng nhau tổ chức các sự kiện lớn của CLB.
                </p>
              </div>
            </div>
            <div className='image-container1'>
              <img src={Aboutus2} alt='' />
            </div>
          </div>
        </div>
        <div className='caclophoc' id='caclophoc'>
          <h1>CÁC LỚP HỌC</h1>
          <div className='card1-list'>
            <div className='card1'>
              <img src={Khoahoc1} alt='' />
              <div className='card-content'>
                <div className='card-title'>#Thiết kế web</div>
                <div className='card-text'>HTML, CSS, Javascript</div>
              </div>
            </div>
            <div className='card1'>
              <img src={Khoahoc2} alt='' />
              <div className='card-content'>
                <div className='card-title'>#Lập trình OOP</div>
                <div className='card-text'>Java, C++</div>
              </div>
            </div>
            <div className='card1'>
              <img src={Khoahoc3} alt='' />
              <div className='card-content'>
                <div className='card-title'>#Photoshop</div>
                <div className='card-text'>Brush, selection...</div>
              </div>
            </div>
            <div className='card1'>
              <img src={Khoahoc4} alt='' />
              <div className='card-content'>
                <div className='card-title'>#Python</div>
                <div className='card-text'>Numpy, Matplotlib, CV</div>
              </div>
            </div>
            <div className='card1'>
              <img src={Khoahoc5} alt='' />
              <div className='card-content'>
                <div className='card-title'>#Frontend Web</div>
                <div className='card-text'>ReactJS, VueJS</div>
              </div>
            </div>
            <div className='card1'>
              <img src={Khoahoc6} alt='' />
              <div className='card-content'>
                <div className='card-title'>#NodeJS</div>
                <div className='card-text'>NodeJS, ExpressJS</div>
              </div>
            </div>
            <div className='card1'>
              <img src={Khoahoc7} alt='' />
              <div className='card-content'>
                <div className='card-title'>#Frontend Mobile</div>
                <div className='card-text'>Flutter, Kotlin</div>
              </div>
            </div>
            <div className='card1'>
              <img src={Khoahoc8} alt='' />
              <div className='card-content'>
                <div className='card-title'>#Spring Boot</div>
                <div className='card-text'>Java, MySQL</div>
              </div>
            </div>
            <div className='card1'>
              <img src={Khoahoc9} alt='' />
              <div className='card-content'>
                <div className='card-title'>#Test</div>
                <div className='card-text'>Manual, Automation</div>
              </div>
            </div>
            <div className='card1'>
              <img src={Khoahoc10} alt='' />
              <div className='card-content'>
                <div className='card-title'>#Machine learning</div>
                <div className='card-text'>Regression, SVM, Neural</div>
              </div>
            </div>
            <div className='card1'>
              <img src={Khoahoc11} alt='' />
              <div className='card-content'>
                <div className='card-title'>#Unity</div>
                <div className='card-text'>C#</div>
              </div>
            </div>
            <div className='card1'>
              <img src={Khoahoc12} alt='' />
              <div className='card-content'>
                <div className='card-title'>#UI/UX</div>
                <div className='card-text'>Illustrator, Figma</div>
              </div>
            </div>
          </div>
        </div>
        <div className='hoidap' id='hoidap'>
          <h1>HỎI ĐÁP</h1>

          <div className='content'>
            <div className='image-container'>
              <img src={Hoidap} alt='' />
            </div>
            <div className='container-section'>
              <div className='section1'>
                <div className='faq'>
                  <div className='faq-question'>
                    Làm sao để trở thành thành viên của CLB Tin Học HIT thế ạ?
                  </div>
                  <div className='faq-answer hidden'>
                    <p>
                      CLB Tin học HIT sẽ có duy nhất một đợt tuyển thành viên vào tháng 9/tháng 10
                      hằng năm, bạn có thể theo dõi thông tin chi tiết trên Fanpage của CLB. Trong
                      quá trình tuyển thành viên, bạn sẽ trải qua 1 bài test IQ/EQ dưới hình thức
                      online. Sau khi vượt qua bài test, bạn sẽ tham gia phỏng vấn trực tiếp tại
                      tầng 9-A1 Trường Đại học Công nghiệp Hà Nội. CLB sẽ xem xét ứng viên có thực
                      sự phù hợp với CLB Tin Học HIT hay không? Và kết quả sẽ được gửi tới các bạn
                      sớm nhất!
                    </p>
                  </div>
                  <div className='faq-arrow'>
                    <IconCircleArrowDownFilled />
                  </div>
                </div>
              </div>
              <div className='section1'>
                <div className='faq'>
                  <div className='faq-question'>
                    <p>CLB Tin học HIT có mở các lớp học không ạ?</p>
                    <p>Nếu có thì các lớp học về gì thế ạ?</p>
                  </div>
                  <div className='faq-answer hidden'>
                    <p>
                      CLB Tin học HIT là câu lạc bộ học thuật và có mở các lớp Public cũng như
                      Private theo định kỳ. Đối với các bạn là cộng tác viên hoặc chưa là thành viên
                      của CLB, các bạn sẽ được tham gia các lớp Public ở 2 cơ sở Hà Nam và Hà Nội
                      như: C/C++, Olympic, Photoshop,.... Đối với các bạn là thành viên của CLB sẽ
                      có quyền lợi học các lớp Private. Các bạn sẽ được đi từ các lớp cơ bản như
                      Web, Java, Python, Photoshop,... và sau đó phát triển lên các lớp nâng cao như
                      ReactJS, NodeJS, Flutter, Test, Spring, AI, Android, Vue, Illustrator, UX/UI..
                      Các lớp đều được các anh chị trong CLB leader và support rất nhiệt tình. Mọi
                      thông tin bạn có thể tham khảo và theo dõi trên Fanpage của CLB nhé!
                    </p>
                  </div>
                  <div className='faq-arrow'>
                    <IconCircleArrowDownFilled />
                  </div>
                </div>
              </div>
              <div className='section1'>
                <div className='faq'>
                  <div className='faq-question'>
                    Câu lạc bộ mình có tổ chức có buổi offline hay vui chơi kiểu như team building
                    không ạ?
                  </div>
                  <div className='faq-answer hidden'>
                    <p>
                      Có bạn nhé! CLB Tin học HIT sẽ tổ chức offline vào mỗi thứ 5 tuần đầu tiên của
                      các tháng. Trong các buổi offline, các bạn sẽ được gặp gỡ, cùng nhau trò
                      chuyện, theo dõi và tham các hoạt động sắp tới của CLB. Hằng năm, CLB sẽ tổ
                      chức các buổi teambuilding và du lịch định kỳ. Sau những ngày làm việc và học
                      tập mệt mỏi, các bạn có thể thư giãn, cùng nhau chơi những trò chơi, cùng nhau
                      ăn uống và làm quen với các anh chị cũng như thân thiết hơn với các bạn trong
                      CLB... Thật tuyệt vời đúng không nào?
                    </p>
                  </div>
                  <div className='faq-arrow'>
                    <IconCircleArrowDownFilled />
                  </div>
                </div>
              </div>
              <div className='section1'>
                <div className='faq'>
                  <div className='faq-question'>
                    Câu lạc bộ có những sự kiện gì ạ? Có các cuộc thi hay vui chơi gì không ạ?
                  </div>
                  <div className='faq-answer hidden'>
                    <p>
                      CLB Tin Học HIT là một môi trường năng động kết hợp giữa học tập và vui chơi.
                      CLB thường xuyên tổ chức các cuộc thi như HIT Contest, HIT Game, HIT
                      OpenDay... Qua đó, các bạn có thể học hỏi, trao đổi kiến thức và thử thách bản
                      thân mình. Bên cạnh đó, trong các buổi offline hàng tháng, teambuilding hay du
                      lịch các bạn sẽ được thỏa sức vui chơi, trò chuyện và làm quen với thật nhiều
                      bạn mới, có được những phút giây thư giãn sau những giờ học căng thẳng. Hãy để
                      HIT điểm tô thêm sắc màu cho quãng đời sinh viên của bạn và đồng hành cùng bạn
                      trong hành trình mở rộng chân trời khám phá của bản thân nhé!
                    </p>
                  </div>
                  <div className='faq-arrow'>
                    <IconCircleArrowDownFilled />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutHIT
