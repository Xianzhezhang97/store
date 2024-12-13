'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setGlobal } from '@/redux/slices/globalSlice';
interface StyleItemProps {
  name: string;
  className: string;
  type?: 'color' | 'text' | 'spacing' | 'border' | 'radius' | undefined;
  size?: number;
}

const renderConcreteStyle = (type: string, className: string, name: string) => {
  return (
    <div>
      {type === 'color' && (
        <div
          className={`w-16 h-16 ${className} rounded-full border-2  border-gray-200`}
        />
      )}
      {type === 'border' && (
        <div
          className={`w-16 h-16 ${className} rounded-full border-2 bg-secondary border-secondary`}
        />
      )}
      {type === 'text' && <div className={`${className} p-2`}>{name}</div>}
      {type === 'spacing' && (
        <div className={`${className} border-primary border-b-4 `} />
      )}
    </div>
  );
};

const StyleItem: React.FC<StyleItemProps> = ({
  name,
  className,
  size,
  type = 'color',
}) => {
  return (
    <div
      className={`bg-body card-rounded flex flex-col p-lg shadow-sm col-span-12 relative justify-start items-center md:col-span-6 lg:col-span-3 ${
        size ? `xl:col-span-${size}` : 'xl:col-span-2'
      }`}
    >
      <kbd className='bg-third border-b border-x border-third rounded-b-sm font-semibold text-xs text-primary py-1.5 px-2 top-0 left-12 absolute darrk:bg-gray-600 darrk:border-gray-500 darrk:text-gray-100'>
        {type}
      </kbd>
      <div className='border-b flex h-full p-xl w-full justify-center'>
        {renderConcreteStyle(type, className, name)}
      </div>

      <div className='my-4 text-center'>
        <code className='font-bold text-base'>{name}</code>
        <br />
        <code className='font-mono text-sm'>{className}</code>
        <button className='border rounded-sm m-4 text-xs px-2'>Copy</button>
      </div>
    </div>
  );
};

const StyleGuide: React.FC = () => {
  const categories = [
    {
      title: 'Colors',
      type: 'color' as 'color',
      items: [
        {
          category: 'Theme Colors',
          items: [
            { name: 'Primary', className: 'bg-primary' },
            { name: 'Secondary', className: 'bg-secondary' },
            { name: 'Third', className: 'bg-third' },
          ],
        },
        {
          category: 'Basic Colors',
          items: [
            { name: 'Neutral', className: 'bg-neutral' },
            { name: 'Muted', className: 'bg-muted' },
            { name: 'Overlay', className: 'bg-overlay' },
          ],
        },
        {
          category: 'Status Colors',
          items: [
            { name: 'Info', className: 'bg-info' },
            { name: 'Success', className: 'bg-success' },
            { name: 'Warning', className: 'bg-warning' },
            { name: 'Error', className: 'bg-error' },
          ],
        },
        {
          category: 'Event Colors',
          items: [
            { name: 'Hover', className: 'bg-hover' },
            { name: 'Active', className: 'bg-active' },
            { name: 'Disabled', className: 'bg-disabled' },
            { name: 'Focus', className: 'bg-focus' },
          ],
        },
        {
          category: 'Text Colors',
          items: [
            { name: 'Text H1', className: 'bg-tc-h1' },
            { name: 'Text H2', className: 'bg-tc-h2' },
            { name: 'Text H3', className: 'bg-tc-h3' },
            { name: 'Text H4', className: 'bg-tc-h4' },
            { name: 'Text Body', className: 'bg-tc-body' },
            { name: 'Text Secondary', className: 'bg-secondary' },
            { name: 'Text Muted', className: 'bg-muted' },
            { name: 'Text Inverted', className: 'bg-inverted' },
            { name: 'Text Link', className: 'bg-tc-link' },
          ],
        },
      ],
    },
    {
      title: 'Font Sizes',
      type: 'text' as 'text',
      items: [
        {
          category: 'Font Sizes',
          items: [
            { name: 'XS', className: 'text-xs', size: 2 },
            { name: 'SM', className: 'text-sm', size: 2 },
            { name: 'Base', className: 'text-base', size: 2 },
            { name: 'LG', className: 'text-lg', size: 2 },
            { name: 'XL', className: 'text-xl', size: 2 },
            { name: '2XL', className: 'text-2xl', size: 2 },
            { name: '3XL', className: 'text-3xl', size: 2 },
            { name: '4XL', className: 'text-4xl', size: 2 },
            { name: '5XL', className: 'text-5xl', size: 2 },
            { name: '6XL', className: 'text-6xl', size: 2 },
            { name: '7XL', className: 'text-7xl', size: 4 },
            { name: '8XL', className: 'text-8xl', size: 4 },
            { name: '9XL', className: 'text-9xl', size: 4 },
          ],
        },
      ],
    },
    {
      title: 'Border Radius',
      type: 'border' as 'border',
      items: [
        {
          category: 'Border Radii',
          items: [
            { name: 'None', className: 'rounded-none' },
            { name: 'Small', className: 'rounded-sm' },
            { name: 'Medium', className: 'rounded-md' },
            { name: 'Large', className: 'card-rounded' },
            { name: 'Full', className: 'rounded-full' },
          ],
        },
      ],
    },
    {
      title: 'Spacing',
      type: 'spacing' as 'spacing',
      items: [
        {
          category: 'Spacing',
          items: [
            { name: 'Spacing 1', className: 'p-1' },
            { name: 'Spacing 2', className: 'p-2' },
            { name: 'Spacing 3', className: 'p-3' },
            { name: 'Spacing 4', className: 'p-4' },
            { name: 'Spacing 5', className: 'p-5' },
            { name: 'Spacing 6', className: 'p-6' },
            { name: 'Spacing 7', className: 'p-7' },
            { name: 'Spacing 8', className: 'p-8' },
            { name: 'Spacing 9', className: 'p-9' },
            { name: 'Spacing 10', className: 'p-10' },
            { name: 'Spacing 11', className: 'p-11' },
            { name: 'Spacing 12', className: 'p-12' },
          ],
        },
      ],
    },
  ];

  const gridStyle = 'grid grid-gap grid-cols-12 xl:grid-cols-10';
  const h2 = 'my-8 text-2xl font-[600]';
  const h3 = 'my-4 font-semibold text-lg';
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setGlobal({ GobalPadding: false }));
    return () => {
      dispatch(setGlobal({ GobalPadding: true }));
    };
  }, [dispatch]);

  return (
    <div className='card-padding '>
      <h1 className='font-bold mb-2 text-4xl'>
        Design Documentation Style Guide
      </h1>
      <p className='text-base mb-8'>
        This page was made by Scott. This page is used to adjust UI and test
        whether the components develop correctly. All rights reserved by Scott.
      </p>

      {categories.map((category, index) => (
        <div key={index}>
          <h2 className={h2}>{category.title}</h2>

          {/* 总览部分 */}
          <div className='bg-body  flex flex-wrap shadow-sm mb-8 grid-gap transition-all col-span-12 card-padding justify-center  card-rounded'>
            {category.items.map((group, groupIndex) =>
              group.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`flex group flex-col items-center p-4`}
                >
                  {renderConcreteStyle(
                    category.type,
                    item.className,
                    item.name,
                  )}
                  <h3 className='mt-3 text-muted group-hover:text-tc-h1'>
                    {item.name}
                  </h3>
                  <button className='border rounded-sm mt-2 text-xs opacity-0 px-2 transition-all duration-500 group-hover:opacity-100'>
                    Copy
                  </button>
                </div>
              )),
            )}
          </div>

          {/* 详细部分 */}
          {category.items.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className={h3}>{group.category}</h3>
              <div className={gridStyle}>
                {group.items.map(
                  (
                    item: { name: string; className: string; size?: number },
                    itemIndex,
                  ) => (
                    <StyleItem
                      key={itemIndex}
                      name={item.name}
                      className={item.className}
                      type={category.type}
                      size={item.size || undefined}
                    />
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StyleGuide;
