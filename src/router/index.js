import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login'
import Index from '@/components/index'
import PersonCenter from '@/components/personalCenter'
import Setting from '@/components/setting'
import OperateLog from '@/components/operateLog'
import AuthorityManage from '@/components/authorityManage/authorityManage'
import PersonAuthority from '@/components/authorityManage/personAuthority'
import RoleManage from '@/components/authorityManage/roleManage'

import DataBaseIndex from '@/components/dataBaseManage/dataBaseIndex'
import SNPManage from '@/components/dataBaseManage/snpManage'
import TeaVarietyDatabase from '@/components/dataBaseManage/teaVarietyDatabase'
import BeltRoadDatabase from '@/components/dataBaseManage/beltRoadDatabase'
import ConsumerDatabase from '@/components/dataBaseManage/consumerDatabase'
import MultiImport from '@/components/dataBaseManage/multiImport'
import SingleImport from '@/components/dataBaseManage/singleImport'

import UserManage from '@/components/userManage/userManage'
import PersonManage from '@/components/userManage/PersonManage'


import DictionaryIndex from '@/components/dictionaryManage/dictionaryIndex'
import DetailDictionary from '@/components/dictionaryManage/detailDictionary'
import EditDictionary from '@/components/dictionaryManage/editDictionary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/PersonCenter',
      name: 'PersonCenter',
      component: PersonCenter
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/OperateLog',
      name: 'OperateLog',
      component: OperateLog
    },
    {
      path: '/AuthorityManage',
      name: 'AuthorityManage',
      component: AuthorityManage
    },
    {
      path: '/PersonAuthority',
      name: 'PersonAuthority',
      component: PersonAuthority
    },
    {
      path: '/RoleManage',
      name: 'RoleManage',
      component: RoleManage
    },
    {
      path:'/DataBaseIndex',
      name:'DataBaseIndex',
      component: DataBaseIndex
    },
    {
      path:'/SNPManage',
      name:'SNPManage',
      component: SNPManage
    },
    {
      path:'/TeaVarietyDatabase',
      name:'TeaVarietyDatabase',
      component: TeaVarietyDatabase
    },
    {
      path:'/BeltRoadDatabase',
      name:'BeltRoadDatabase',
      component: BeltRoadDatabase
    },
    {
      path:'/ConsumerDatabase',
      name:'ConsumerDatabase',
      component: ConsumerDatabase
    },
    {
      path:'/MultiImport',
      name:'MultiImport',
      component: MultiImport
    },
    {
      path:'/SingleImport',
      name:'SingleImport',
      component: SingleImport
    },

    {
      path:'/UserManage',
      name:'UserManage',
      component: UserManage
    },
    {
      path:'/PersonManage',
      name:'PersonManage',
      component: PersonManage
    },

    {
      path:'/DictionaryIndex',
      name:'DictionaryIndex',
      component: DictionaryIndex
    },
    {
      path:'/DetailDictionary',
      name:'DetailDictionary',
      component: DetailDictionary
    },
    {
      path:'/EditDictionary',
      name:'EditDictionary',
      component: EditDictionary
    }
  ]
})
