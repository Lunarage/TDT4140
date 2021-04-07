import { mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJSON from "enzyme-to-json";
import Browse from '../../browse/Browse';
import { store } from '../..';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const BrowseWrapper = () => (
  <Provider store={store}>
    <Browse />
  </Provider>
);

describe("Browse", () => {
  it("renders Browse", () => {
    mount(<BrowseWrapper />);
  });
  it("Should match Browse snapshot", () => {
    const comp = mount(<BrowseWrapper />);
    expect(toJSON(comp)).toMatchSnapshot();
  });
});

