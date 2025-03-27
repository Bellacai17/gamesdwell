import { render, screen } from '@testing-library/react';
import Footer from './Footer';
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

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />);
    const brandName = screen.getByText('GamesDwell');
    expect(brandName).toBeInTheDocument();
  });

  it('renders the categories section', () => {
    render(<Footer />);
    
    const categoriesHeading = screen.getByText('Categories');
    expect(categoriesHeading).toBeInTheDocument();
    
    // 检查分类链接
    const actionLink = screen.getByText('Action Games');
    expect(actionLink).toBeInTheDocument();
    expect(actionLink.closest('a')).toHaveAttribute('href', '/category/action');
    
    const puzzleLink = screen.getByText('Puzzle Games');
    expect(puzzleLink).toBeInTheDocument();
    expect(puzzleLink.closest('a')).toHaveAttribute('href', '/category/puzzle');
    
    const strategyLink = screen.getByText('Strategy Games');
    expect(strategyLink).toBeInTheDocument();
    expect(strategyLink.closest('a')).toHaveAttribute('href', '/category/strategy');
  });

  it('renders the quick links section', () => {
    render(<Footer />);
    
    const quickLinksHeading = screen.getByText('Quick Links');
    expect(quickLinksHeading).toBeInTheDocument();
    
    // 检查快速链接
    const aboutLink = screen.getByText('About Us');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
    
    const contactLink = screen.getByText('Contact');
    expect(contactLink).toBeInTheDocument();
    
    const privacyLink = screen.getByText('Privacy Policy');
    expect(privacyLink).toBeInTheDocument();
  });

  it('renders the social links section', () => {
    render(<Footer />);
    
    const socialHeading = screen.getByText('Connect With Us');
    expect(socialHeading).toBeInTheDocument();
    
    const twitterLink = screen.getByText('Twitter');
    expect(twitterLink).toBeInTheDocument();
    
    const discordLink = screen.getByText('Discord');
    expect(discordLink).toBeInTheDocument();
  });

  it('renders the copyright notice with current year', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(`© ${currentYear} GamesDwell. All rights reserved.`);
    expect(copyrightText).toBeInTheDocument();
  });
}); 