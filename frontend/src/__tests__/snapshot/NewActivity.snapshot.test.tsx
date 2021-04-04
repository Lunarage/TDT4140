import { mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJSON from "enzyme-to-json";
import NewActivity from '../../components/NewActivity';
import { store } from '../..';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const NewActivityWrapper = () => (
  <Provider store={store}>
    <NewActivity onExitFunc={() => { }} />
  </Provider>
);

describe("NewActivity", () => {
  it("renders NewActivity", () => {
    mount(<NewActivityWrapper />);
  });
  it("Should match NewActivity snapshot", () => {
    const comp = mount(<NewActivityWrapper />);
    expect(toJSON(comp)).toMatchSnapshot();
  });
});

