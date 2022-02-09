import r from './constants/routes.constants'

import Home from './pages/public/Home'
import SignIn from './pages/public/SignIn'
import SignUp from './pages/public/SignUp'
import ResetPassword from './pages/public/ResetPassword'
import Leader from './pages/private/Leader'
import Dashboard from './pages/private/Dashboard'
import News from './pages/private/News'
import TableQueue from './pages/private/Star/TableQueue'

import Tables from './pages/private/Star'
import SuperStars from './pages/private/SuperStars'
import SuperStarsTable from './pages/private/SuperStars/SuperStarTable'
import PremiumStars from './pages/private/AutoStars'
import PremiumStarsTable from './pages/private/AutoStars/Table'
import Table from './pages/private/Star/Table'
import Exchange from './pages/private/exchange'
import StarTrek from './pages/private/StarTrek'
import StarTrekPlanets from './pages/private/StarTrek/MyPlanets'
import StarTrekStatistic from './pages/private/StarTrek/Statistic'
import StarsUp from './pages/private/StarsUp'
import AboutUs from './pages/private/AboutUs'
import Finances from './pages/private/Finances'
import Team from './pages/private/Team'
import Education from './pages/private/Education'
import Settings from './pages/private/Settings'
import Myinvest from './pages/private/StarsUp/component/Myinvest'
import Histori from './pages/private/StarsUp/component/Histori'
import Casino from './pages/private/Casino/Casino'
import JuegoRuleta from './pages/private/Casino/components/JuegoRuleta'
import DICE from './pages/private/Casino/components/dice/App'
import Fool from './pages/private/Casino/components/fool/Casino'
import Canvas from './pages/private/Casino/components/Slots/components/Canvas'

export const publicRouteConfig = [
  {
    id: '6bd16003-a02d-43d6-97d5-b94433055e27',
    path: r.root,
    component: Home,
    exact: true,
  },
  {
    id: '8bcb9969-6c40-44ed-910f-b2e41e29308b',
    path: r.signIn,
    component: SignIn,
    exact: true,
  },
  {
    id: '0aa2a683-6840-4a97-a258-b5247f20ac52',
    path: r.signUp,
    component: SignUp,
    exact: true,
  },
  {
    id: 'c007b79a-ee31-4bbb-9282-91937f96e341',
    path: r.resetPassword,
    component: ResetPassword,
    exact: true,
  },
]

export const panelRouteConfig = [
  {
    id: 'dbfec38e-c96d-4c50-8cec-43d775bb38b8',
    path: r.leader,
    component: Leader,
    exact: true,
  },
  {
    id: '6705c818-7c9f-4757-bf1f-0d20e2b0700a',
    path: r.dashboard,
    component: Dashboard,
    exact: true,
  },
  {
    id: 'f748dad1-b173-4df0-bce4-6cb87e576637',
    path: [r.news, r.newsItem],
    component: News,
    exact: true,
  },
  {
    id: '5a02e43a-028e-4a64-9de7-a8495c4a289f',
    path: r.tables,
    component: Tables,
    exact: true,
  },
  {
    id: '470c1df2-4bf9-4c41-897a-b7267e53aa68',
    path: [r.personalTable, r.table],
    component: Table,
    exact: true,
  },
  {
    id: 'fa4bc3a7-6bea-47ae-bb00-9bba1f1f3349',
    path: [r.personalTableQueue, r.tableQueue],
    component: TableQueue,
    exact: true,
  },
  {
    id: '357f592b-1be8-41d5-a8a3-b62fc8d718d5',
    path: r.premiumStars,
    component: PremiumStars,
    exact: true,
  },
  {
    id: '0d949aa4-725e-4cad-a58f-a1b843e27515',
    path: [r.premiumTable, r.personalPremiumTable],
    component: PremiumStarsTable,
    exact: true,
  },
  {
    id: '109425a8-752d-42a5-83f2-98167f22d9cb',
    path: r.superStars,
    component: SuperStars,
    exact: true,
  },
  {
    id: '1c2cb6b0-4bf1-466a-bf84-bc9e71e40dda',
    path: [r.personalSSTable, r.ssTable],
    component: SuperStarsTable,
    exact: true,
  },
  {
    id: 'a682cca2-82df-4daa-81ed-70cc6868d3e2',
    path: r.starTrek,
    component: StarTrek,
    exact: true,
  },
  {
    id: '3c6eb283-5d8c-4775-b9d0-43c640c3d6ab',
    path: r.starTrekPlanets,
    component: StarTrekPlanets,
    exact: true,
  },
  {
    id: 'ef10ab44-2bc9-4498-a8e8-b89d31060a10',
    path: r.starTrekStatistic,
    component: StarTrekStatistic,
    exact: true,
  },
  {
    id: 'bb41be1a-b5a0-4502-a06b-a338ea47904d',
    path: r.starsUp,
    component: StarsUp,
    exact: true,
  },
  {
    id: 'd321bf61-e67a-4809-9dd9-d8a425917178',
    path: r.myinvestments,
    component: Myinvest,
    exact: true,
  },
  {
    id: 'investbox_pack_history_table_wrapper',
    path: r.investbox,
    component: Histori,
    exact: true,
  },
  {
    id: '1dcd587d-a25f-466b-aaa9-b8f943874d05',
    path: r.aboutUs,
    component: AboutUs,
    exact: true,
  },
  {
    id: '3fd9cbab-e44e-4cc7-82c5-da52238f7f44',
    path: r.finances,
    component: Finances,
    exact: true,
  },
  {
    id: 'fd8a91bc-d70f-4918-a510-5510cd7a81c8',
    path: r.team,
    component: Team,
    exact: true,
  },
  {
    id: '1987f95f-f16c-4388-b878-8b7726b1c248',
    path: `${r.team}/:userId`,
    component: Team,
    exact: true,
  },
  {
    id: '0a51ed92-9f9f-4d95-9bf3-fb47eb36289f',
    path: [r.education, r.educationComment, r.educationForm],
    component: Education,
    exact: true,
  },
  {
    id: '0ea39de5-795b-45a8-b40e-a66b75f5e514',
    path: r.settings,
    component: Settings,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e454af',
    path: r.exchange,
    component: Exchange,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e454gf',
    path: r.casino,
    component: Casino,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e45',
    path: r.rollet,
    component: JuegoRuleta,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e454589361',
    path: r.dice,
    component: DICE,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e454561',
    path: r.fool,
    component: Fool,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e45456147',
    path: r.slots,
    component: Canvas,
    exact: true,
  },
]
