import { PlusIcon } from '@heroicons/react/24/outline';
import { List } from '../components';
import '../styles/pages/profilePage.scss';

export default function ProfilePage() {


  return (
    <div className="profilePage font-poppins">

      <div className="details no-scrollbar ">
        <div className="wrapper">

          <div className="info flex flex-col md:flex-row items-center gap-5 md:gap-10 bg-gradient-to-r from-blue-100 to-rose-100 py-10 md:p-3 rounded-xl">
            <div>
              <img src="https://images.pexels.com/photos/6256894/pexels-photo-6256894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profileimg" className="w-20 h-20 object-cover rounded-full" />
            </div>

            <div className="flex flex-col gap-5">

              <div className="top flex gap-3 justify-center md:justify-start items-end font-chillax">
                <h1 className="text-2xl text-gray-500 font-medium">Hey!</h1>
                <div className="h-auto overflow-hidden">
                  <span className="text-4xl inline-block animate-fadeIn font-semibold text-pink-500">John</span>
                </div>
              </div>

              <div className="bottominfo text-center md:text-left">

                <div>
                  <h2 className="text-xl">Email</h2>
                  <span className="font-chillax">babasahebbhalekar8245@gmail.com</span>
                </div>

              </div>

            </div>

          </div>

          <div className="title">
            <h1 className='text-2xl font-semibold font-chillax'>My List</h1>
            <button className=' flex items-center font-medium bg-blue-600 text-gray-100 py-3 px-4 rounded-md'>Create Posts <PlusIcon className='w-6' /></button>
          </div>

          <List />

          <div className="title">
            <h1 className='text-2xl font-semibold font-chillax'>Saved List</h1>
            <button className=' flex items-center font-medium bg-blue-600 text-gray-100 py-3 px-4 rounded-md'>Create Posts <PlusIcon className='w-6' /></button>
          </div>

        </div>
      </div>

      <div className="chatContainer hidden lg:inline-block">
      </div>

    </div>
  );
}