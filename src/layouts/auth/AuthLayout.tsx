import React, { FC, ReactNode } from 'react';

interface IAuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<IAuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-dusty-teal">
      {/* Left side - Green background with text and logo */}
      <div className="w-1/3  flex-col justify-center items-center px-8 py-12 text-white  ">

        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <div className="">
              <img src="images/icons/mainLogo.svg" />
            </div>
            <h1 className="text-54 font-400">hotel hive</h1>
          </div>
        </div>

        {/* Armenian text content */}
        <div className="text-start max-w-md space-y-4 ">
          <p className="text-16 ">
            Բարի գալուստ Hotel Hive - հյուրանոցի կառավրման հարթակ: Մեր հարթակի միջոցով հյուրանոցները կարող են հավաքել և կառավարել իրենց գնային քաղաքականությունը և կիսվել այս տեղեկատվությունը զբոսաշրջային ընկերությունների հետ՝ առանց որևէ ծախսերի: Մեր հեշտ օգտագործման ինտերֆեյսը հյուրանոցներին թույլ է տալիս իրական ժամանակում ստեղծել և թարմացնել իրենց գնային քաղաքականությունը՝ ապահովելով, որ իրենց տեղեկատվությունը միշտ ճշգրիտ և արդիական է: Եվ զբոսաշրջային ընկերությունների իրենց ցուցակը կառավարելու ունակությամբ հյուրանոցները կարող են ապահովել, որ իրենք միայն իրենց գնային տեղեկությունները կիսում են վստահելի գործընկերների հետ:
          </p>
          <p className="text-16 ">
            Ամենալավ մասը. 
          </p>
          <p className="text-18 ">
            Այս ամենը հասանելի է ձեզ բոլորովին անվճար:
          </p>
          <p className="text-16 ">
          Միացեք Hotel Hive-ին այսօր և սկսեք պարզեցնել ձեր հյուրանոցի գնային քաղաքականությունը և տեղեկություններ փոխանակել զբոսաշրջային ընկերությունների հետ՝ բոլորն անվճար: Մեր նվիրված աջակցության թիմը միշտ այստեղ է օգնելու
          </p>
        </div>
      </div>

      {/* Right side - White background with form */}
      <div className="w-2/3 bg-white flex items-center justify-center p-8 rounded-l-[50px]">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;