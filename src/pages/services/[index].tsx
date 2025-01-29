import Digitalproductdesign from '@/components/services/Digitalproductdesign'
import EngineeringDevOps from '@/components/services/EngineeringDevOps'
import MobileDevelopment from '@/components/services/mobileDevelopment'
import SoftwareAct from '@/components/services/SoftwareAct'
import { useRouter } from 'next/router'
import React from 'react'

const index = () => {
  const router = useRouter()
  console.log(router.query.index)
  return (
    <div>
   
    {router.query.index === "digital-product-design"&&  <Digitalproductdesign />}
     {router.query.index === "software-architecture" && <SoftwareAct />}
     {router.query.index === "engineering-devops" && <EngineeringDevOps />}
     {router.query.index === "mobile-app-development" && <MobileDevelopment />}
    </div>
  )
}

export default index