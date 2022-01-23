import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.scss'
import routes from '../../../constants/routes.constants'
import user from '../../../scss/media/user.5e48b571.svg'
import news from '../../../scss/media/news.58147b12.svg'
import question from '../../../scss/media/question.d8eb4f5a.svg'
import money from '../../../scss/media/money-coin.1ab3ac3b.svg'
import team from '../../../scss/media/team.9cf5738b.svg'
import car from '../../../scss/media/car.9ce679da.svg'
import logo from '../../../scss/media/leader.42ee91d2.svg'
import superstar from '../../../scss/media/suprestar.424178cf.svg'
import luckyStar from '../../../scss/media/12345.png'
import starsUp from '../../../scss/media/leader.42ee91d2.svg'

// import megaphone from 'static/icons/megaphone.svg';
import cap from '../../../scss/media/academic-cap.24d75e30.svg'
// import chat from 'static/icons/chat.svg';
// import reviews from 'static/icons/reviews.svg';
import gear from '../../../scss/media/gear.08e3a0ec.svg'
import leader from '../../../scss/media/leader.42ee91d2.svg'

const navbarLinks = [
  {
    label: 'Мой куратор',
    route: routes.leader,
    isDisabled: false,
    icon: leader,
  },
  {
    label: 'Личный кабинет',
    route: routes.dashboard,
    isDisabled: false,
    icon: user,
  },
  {
    label: 'Новости',
    route: routes.news,
    isDisabled: false,
    icon: news,
  },
  {
    label: 'MATRIX',
    route: routes.tables,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'Matrix2',
    route: routes.premiumStars,
    isDisabled: false,
    icon: car,
  },
  {
    label: 'Matrix3',
    route: routes.starTrek,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'Matrix Reloaded',
    route: routes.superStars,
    isDisabled: false,
    icon: superstar,
  },
  {
    label: 'exchange',
    route: routes.exchange,
    isDisabled: false,
    icon: luckyStar,
  },
  {
    label: 'Investbox',
    route: routes.starsUp,
    isDisabled: false,
    icon: starsUp,
  },
  {
    label: 'О нас',
    route: routes.aboutUs,
    isDisabled: false,
    icon: question,
  },
  {
    label: 'Финансы',
    route: routes.finances,
    isDisabled: false,
    icon: money,
  },
  {
    label: 'Команда',
    route: routes.team,
    isDisabled: false,
    icon: team,
  },
  // {
  //   label: 'Промо',
  //   route: routes.promo,
  //   isDisabled: true,
  //   icon: megaphone,
  // },
  {
    label: 'Обучение',
    route: routes.education,
    isDisabled: false,
    icon: cap,
  },
  // {
  //   label: 'Чат участников',
  //   isDisabled: true,
  //   route: routes.chat,
  //   icon: chat,
  // },
  // {
  //   label: 'Отзывы',
  //   route: routes.reviews,
  //   isDisabled: true,
  //   icon: reviews,
  // },
  {
    label: 'Настройки',
    route: routes.settings,
    isDisabled: false,
    icon: gear,
  },
]

function NavBar() {
  return (
    <nav className={styles.NavBar}>
      {navbarLinks.map(({ label, route, icon, isDisabled }) => (
        <NavLink
          key={label}
          to={route}
          className={`${styles.navLink} ${isDisabled ? styles.disabled : ''}`}
          activeClassName={styles.active}
        >
          <img className={styles.icon} src={icon} alt="" /> {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default NavBar
