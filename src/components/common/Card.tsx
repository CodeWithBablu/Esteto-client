import { Link } from 'react-router-dom';
import '../../styles/ui/card.scss';
import { MapIcon } from '@heroicons/react/24/outline';
import { Estate } from '../../lib';

export default function Card({ item }: { item: Estate }) {
  return (
    <div className='card flex flex-col md:flex-row'>

      <Link to={`/${item.id}`} className='imgContainer h-[250px]'>
        <img src={item.img} alt={item.title} />
      </Link>

      <div className="textContainer flex flex-col gap-3 md:justify-between">
        <h2 className='title'>
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>

        <p className='address'>
          <MapIcon className='w-5' />
          <span>{item.address}</span>
        </p>

        <p className='price'>$ {item.price}</p>

        <div className="bottom flex flex-col lg:flex-row items-start gap-5 lg:items-center lg:justify-between">
          <div className="features">
            <div className="feature">
              <img src="/assets/icons/bed.png" alt="bed" />
              <span>{item.bedroom} bedroom</span>
            </div>

            <div className="feature">
              <img src="/assets/icons/bath.png" alt="bath" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>

          <div className="icons">
            <img className='icon' src="/assets/icons/save.png" alt="save" />
            <img className='icon' src="/assets/icons/chat.png" alt="chat" />
          </div>
        </div>
      </div>
    </div>
  );
}