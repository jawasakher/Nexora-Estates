import React, { useEffect, useState } from 'react';
import { assets } from '../assets/data';

const teamImages = [
  assets.client1,
  assets.client2,
  assets.client3,
  assets.client4,
  assets.user1,
  assets.user2,
  assets.user3,
  assets.user4,
  assets.img5,
  assets.img6
];

const teamMembers = [
  {
    id: 1,
    name: 'Ahmed Al-Mansouri',
    position: 'Chief Executive Officer',
    image: teamImages[0],
    bio: 'With 15+ years in real estate, Ahmed leads Nexora Estates with visionary strategies and deep market expertise.',
    expertise: ['Strategy', 'Market Analysis', 'Leadership'],
    email: 'ahmed@nexora.com',
    phone: '+971 50 123 4567',
    socials: [
      { icon: assets.linkedin, link: '#', label: 'LinkedIn' },
      { icon: assets.twitter, link: '#', label: 'Twitter' },
      { icon: assets.mail, link: 'mailto:ahmed@nexora.com', label: 'Email' }
    ]
  },
  {
    id: 2,
    name: 'Fatima Al-Shamsi',
    position: 'Head of Sales',
    image: teamImages[1],
    bio: 'Fatima excels at connecting clients with their dream properties. Her dedication ensures every transaction runs smoothly.',
    expertise: ['Sales', 'Client Relations', 'Negotiation'],
    email: 'fatima@nexora.com',
    phone: '+971 50 234 5678',
    socials: [
      { icon: assets.linkedin, link: '#', label: 'LinkedIn' },
      { icon: assets.instagram, link: '#', label: 'Instagram' },
      { icon: assets.mail, link: 'mailto:fatima@nexora.com', label: 'Email' }
    ]
  },
  {
    id: 3,
    name: 'Mohammed Al-Mazrouei',
    position: 'Senior Property Consultant',
    image: teamImages[2],
    bio: 'Mohammed specializes in luxury properties and investment opportunities with a proven track record of successful deals.',
    expertise: ['Luxury Properties', 'Investment', 'Valuation'],
    email: 'mohammed@nexora.com',
    phone: '+971 50 345 6789',
    socials: [
      { icon: assets.linkedin, link: '#', label: 'LinkedIn' },
      { icon: assets.phone, link: 'tel:+971503456789', label: 'Phone' },
      { icon: assets.mail, link: 'mailto:mohammed@nexora.com', label: 'Email' }
    ]
  },
  {
    id: 4,
    name: 'Noura Al-Kaabi',
    position: 'Marketing Manager',
    image: teamImages[3],
    bio: 'Noura drives our innovative marketing campaigns and brand presence with creative excellence and digital expertise.',
    expertise: ['Digital Marketing', 'Branding', 'Social Media'],
    email: 'noura@nexora.com',
    phone: '+971 50 456 7890',
    socials: [
      { icon: assets.linkedin, link: '#', label: 'LinkedIn' },
      { icon: assets.instagram, link: '#', label: 'Instagram' },
      { icon: assets.twitter, link: '#', label: 'Twitter' }
    ]
  },
  {
    id: 5,
    name: 'Sarah Al-Amiri',
    position: 'Property Manager',
    image: teamImages[4],
    bio: 'Sarah manages all property operations with meticulous attention to detail and exceptional client service standards.',
    expertise: ['Operations', 'Property Management', 'Client Service'],
    email: 'sarah@nexora.com',
    phone: '+971 50 567 8901',
    socials: [
      { icon: assets.linkedin, link: '#', label: 'LinkedIn' },
      { icon: assets.mail, link: 'mailto:sarah@nexora.com', label: 'Email' }
    ]
  },
  {
    id: 6,
    name: 'Khalid Al-Marri',
    position: 'Investment Specialist',
    image: teamImages[5],
    bio: 'Khalid provides expert guidance on real estate investment strategies and portfolio management for maximum returns.',
    expertise: ['Investment', 'Portfolio Management', 'Analysis'],
    email: 'khalid@nexora.com',
    phone: '+971 50 678 9012',
    socials: [
      { icon: assets.linkedin, link: '#', label: 'LinkedIn' },
      { icon: assets.phone, link: 'tel:+971506789012', label: 'Phone' },
      { icon: assets.mail, link: 'mailto:khalid@nexora.com', label: 'Email' }
    ]
  },
  {
    id: 7,
    name: 'Leila Abdulla',
    position: 'Senior Agent',
    image: teamImages[6],
    bio: 'Leila is a top performer with exceptional negotiation skills and a passion for matching clients with perfect properties.',
    expertise: ['Sales', 'Negotiation', 'Client Relations'],
    email: 'leila@nexora.com',
    phone: '+971 50 789 0123',
    socials: [
      { icon: assets.linkedin, link: '#', label: 'LinkedIn' },
      { icon: assets.instagram, link: '#', label: 'Instagram' },
      { icon: assets.mail, link: 'mailto:leila@nexora.com', label: 'Email' }
    ]
  },
  {
    id: 8,
    name: 'Omar Al-Ketbi',
    position: 'Finance Director',
    image: teamImages[7],
    bio: 'Omar ensures financial transparency and manages all accounting operations with integrity and precision.',
    expertise: ['Finance', 'Accounting', 'Compliance'],
    email: 'omar@nexora.com',
    phone: '+971 50 890 1234',
    socials: [
      { icon: assets.linkedin, link: '#', label: 'LinkedIn' },
      { icon: assets.mail, link: 'mailto:omar@nexora.com', label: 'Email' }
    ]
  },
  {
    id: 9,
    name: 'Amira Hassan',
    position: 'Customer Success Lead',
    image: teamImages[8],
    bio: 'Amira leads our customer success initiatives ensuring every client experiences exceptional support throughout their journey.',
    expertise: ['Customer Support', 'Success Management', 'Communication'],
    email: 'amira@nexora.com',
    phone: '+971 50 901 2345',
    socials: [
      { icon: assets.linkedin, link: '#', label: 'LinkedIn' },
      { icon: assets.instagram, link: '#', label: 'Instagram' },
      { icon: assets.mail, link: 'mailto:amira@nexora.com', label: 'Email' }
    ]
  },
  {
    id: 10,
    name: 'Hassan Al-Mazrouei',
    position: 'Legal Advisor',
    image: teamImages[9],
    bio: 'Hassan provides comprehensive legal guidance on real estate transactions and regulatory compliance matters.',
    expertise: ['Legal', 'Compliance', 'Contracts'],
    email: 'hassan@nexora.com',
    phone: '+971 50 012 3456',
    socials: [
      { icon: assets.linkedin, link: '#', label: 'LinkedIn' },
      { icon: assets.phone, link: 'tel:+971500123456', label: 'Phone' },
      { icon: assets.mail, link: 'mailto:hassan@nexora.com', label: 'Email' }
    ]
  }
];

const TeamMember = ({ member, onViewDetails, index, showCards }) => {
  return (
    <div
      onClick={() => onViewDetails(member)}
      className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-md ring-1 ring-slate-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-secondary/20 cursor-pointer ${
        showCards ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {/* Image Container */}
      <div className='relative h-40 overflow-hidden sm:h-48'>
        <img
          src={member.image}
          alt={member.name}
          className='h-full w-full object-cover object-top contrast-[1.03] saturate-110 transition-transform duration-500 group-hover:scale-112'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
        <div className='absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-slate-700 ring-1 ring-slate-900/10'>
          Team #{String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content Container */}
      <div className='relative p-4'>
        {/* Name & Position */}
        <h4 className='text-base font-bold text-slate-950 line-clamp-1'>{member.name}</h4>
        <p className='mt-0.5 bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-xs font-semibold text-transparent line-clamp-1'>
          {member.position}
        </p>

        {/* View Details Button */}
        <button
          className='mt-3 w-full rounded-lg bg-gradient-to-r from-secondary/20 to-tertiary/20 py-2 px-3 text-xs font-semibold text-secondary transition-all hover:from-secondary hover:to-tertiary hover:text-white border border-secondary/30'
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setShowCards(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section className='bg-gradient-to-b from-white to-slate-50/50 py-12 xl:py-20'>
      <div className='max-padd-container'>
        {/* Section Header */}
        <div className='mb-12 text-center xl:mb-16'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary border border-secondary/20'>
            <img src={assets.users} alt='' width={16} className='opacity-70' />
            Meet Our Team
          </div>
          <h2 className='h2 mb-4'>Expert Leadership & Professionals</h2>
          <p className='max-w-2xl mx-auto text-slate-600'>
            Our dedicated team of real estate professionals brings decades of combined experience, expertise, and a passion for excellence in every transaction.
          </p>
        </div>

        {/* Team Grid */}
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5'>
          {teamMembers.map((member, index) => (
            <TeamMember
              key={member.id}
              member={member}
              index={index}
              showCards={showCards}
              onViewDetails={setSelectedMember}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className='mt-16 rounded-3xl border border-slate-900/10 bg-gradient-to-r from-secondary/10 via-white/50 to-tertiary/10 p-8 text-center'>
          <h3 className='h4 mb-3'>Join Our Growing Team</h3>
          <p className='mb-6 text-slate-600'>
            We're always looking for talented professionals to join Nexora Estates. Explore career opportunities with us.
          </p>
          <button className='btn-secondary rounded-full px-8'>Explore Careers</button>
        </div>
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div 
          className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm'
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className='bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className='relative h-64 overflow-hidden rounded-t-3xl'>
              <img 
                src={selectedMember.image} 
                alt={selectedMember.name}
                className='w-full h-full object-cover'
              />
              <button
                onClick={() => setSelectedMember(null)}
                className='absolute top-4 right-4 flex items-center justify-center h-10 w-10 rounded-full bg-white/90 hover:bg-white transition-all shadow-lg'
              >
                <img src={assets.close} alt='close' className='h-5 w-5' />
              </button>
            </div>

            {/* Modal Content */}
            <div className='p-8'>
              {/* Name and Position */}
              <div className='mb-6'>
                <h2 className='text-3xl font-bold text-slate-950'>{selectedMember.name}</h2>
                <p className='mt-2 bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-lg font-semibold text-transparent'>
                  {selectedMember.position}
                </p>
              </div>

              {/* Bio */}
              <div className='mb-6 pb-6 border-b border-slate-200'>
                <p className='text-slate-700 leading-relaxed text-base'>
                  {selectedMember.bio}
                </p>
              </div>

              {/* Expertise */}
              <div className='mb-8'>
                <h4 className='text-sm font-semibold text-slate-950 mb-3 uppercase tracking-wider'>Areas of Expertise</h4>
                <div className='flex flex-wrap gap-2'>
                  {selectedMember.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      className='inline-block rounded-full bg-secondary/15 px-4 py-2 text-sm font-medium text-secondary border border-secondary/30'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className='mb-8 pb-8 border-b border-slate-200'>
                <h4 className='text-sm font-semibold text-slate-950 mb-4 uppercase tracking-wider'>Contact Information</h4>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 border border-secondary/20'>
                      <img src={assets.mail} alt='email' className='h-5 w-5 opacity-70' />
                    </div>
                    <div>
                      <p className='text-xs text-slate-500 uppercase tracking-wider'>Email</p>
                      <a href={`mailto:${selectedMember.email}`} className='text-sm font-semibold text-secondary hover:text-tertiary transition-colors'>
                        {selectedMember.email}
                      </a>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 border border-secondary/20'>
                      <img src={assets.phone} alt='phone' className='h-5 w-5 opacity-70' />
                    </div>
                    <div>
                      <p className='text-xs text-slate-500 uppercase tracking-wider'>Phone</p>
                      <a href={`tel:${selectedMember.phone}`} className='text-sm font-semibold text-secondary hover:text-tertiary transition-colors'>
                        {selectedMember.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className='mb-6'>
                <h4 className='text-sm font-semibold text-slate-950 mb-4 uppercase tracking-wider'>Connect With {selectedMember.name.split(' ')[0]}</h4>
                <div className='flex items-center gap-4'>
                  {selectedMember.socials.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link}
                      aria-label={social.label}
                      className='group/icon relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-secondary/20 bg-gradient-to-r from-secondary/10 to-tertiary/10 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-secondary hover:shadow-lg hover:shadow-secondary/30'
                      title={social.label}
                      style={{ transitionDelay: `${idx * 70}ms` }}
                    >
                      <span className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-500 group-hover/icon:translate-x-full' />
                      <img src={social.icon} alt={social.label} className='relative h-5 w-5 object-contain transition-transform duration-300 group-hover/icon:scale-110' />
                    </a>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => setSelectedMember(null)}
                className='w-full rounded-lg bg-gradient-to-r from-secondary to-tertiary py-3 px-6 font-semibold text-white transition-all hover:shadow-lg shadow-secondary/30'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Team;
