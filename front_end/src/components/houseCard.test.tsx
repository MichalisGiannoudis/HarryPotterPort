import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HouseCard from './houseCard';
import { House } from '@/models/house.interface';

const MOCK_CONTENT = {
  pageId: 'mock-page',
  founderLabel: 'founder-label',
  houseSearchLabel: 'house-search-label',
  houseSearchEmptyResultsLabel: 'house-empty-result-label',
  houseSearchErrorLabel: 'error-label',
  houseTraitSearchLabel: 'house-trait-search-label',
}

const MOCK_HOUSE_CARD_PROPS = {
  founderLabel: 'founder-label',
  houseTraitSearchLabel: 'house-trait-search-label',
}

const mockHouse: House = {
  id: '1',
  name: 'Gryffindor',
  animal: 'Lion',
  houseColours: 'Scarlet and Gold',
  founder: 'Godric Gryffindor',
  element: 'Fire',
  ghost: 'Nearly Headless Nick',
  commonRoom: 'Gryffindor Tower',
  heads: [
    {
      id: '1',
      firstName: 'Minerva',
      lastName: 'McGonagall'
    }
  ],
  traits: [
    { id: '1', name: 'Bravery' },
    { id: '2', name: 'Courage' },
    { id: '3', name: 'Chivalry' },
  ],
};

jest.mock('@/hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

const testRender = (...props: any[]) => render(<HouseCard house={mockHouse}  {...MOCK_HOUSE_CARD_PROPS} {...props} />)

describe('HouseCard', () => {
  it('renders house information correctly', () => {
    const { container, getByTestId } = testRender();

    expect(screen.getByText('Gryffindor')).toBeInTheDocument();
    expect(screen.getByText('Lion')).toBeInTheDocument();
    expect(screen.getByText('founder-label:')).toBeInTheDocument();
    expect(screen.getByText('Godric Gryffindor')).toBeInTheDocument();
    expect(getByTestId('house-card-' + mockHouse.id)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('filters traits based on search input', () => {
    const { getByTestId } = testRender();

    const searchInput = getByTestId(`house-card-${mockHouse.id}-trait-search`);
    fireEvent.change(searchInput, { target: { value: 'bra' } });

    expect(screen.getByText('Bravery')).toBeInTheDocument();
    expect(screen.queryByText('Courage')).not.toBeInTheDocument();
    expect(screen.queryByText('Chivalry')).not.toBeInTheDocument();
  });
}); 