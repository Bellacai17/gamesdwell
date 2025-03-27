import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { categories } from '../data/games';
import '@testing-library/jest-dom';

// 模拟 Next.js Link 组件
jest.mock('next/link', () => {
  return ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

describe('Navbar', () => {
  it('renders the logo with correct text', () => {
    render(<Navbar />);
    
    const logo = screen.getByText('GamesDwell');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('text-gradient');
  });

  it('renders all category links', () => {
    render(<Navbar />);
    
    // 检查所有分类是否已经渲染
    categories.forEach(category => {
      const link = screen.getByText(category.name);
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', `/category/${category.id}`);
    });
  });

  it('renders the Play Now button', () => {
    render(<Navbar />);
    
    const button = screen.getByText('Play Now');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button-primary');
  });
}); 