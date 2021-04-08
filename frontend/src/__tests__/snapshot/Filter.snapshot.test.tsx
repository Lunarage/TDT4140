import { mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJSON from "enzyme-to-json";
import Filter from '../../filter/Filter';
import { store } from '../..';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const FilterWrapper = () => (
  <Provider store={store}>
    <Filter />
  </Provider>
);

describe("Filter", () => {
  it("renders Filter", () => {
    mount(<FilterWrapper />);
  });
  it("Should match Filter snapshot", () => {
    const comp = mount(<FilterWrapper />);
    expect(toJSON(comp)).toMatchSnapshot();
  });
});

