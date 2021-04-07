import { mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // enzyme does not like new react. workaround
import toJSON from "enzyme-to-json";
import ActivityExpand from '../../components/ActivityExpand';
import { eventTest } from '../../testingData';
import { store } from '../..';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

// must include provider with store so that the test knows the redux-store
const ActivityExpandWrapper = () => (
  <Provider store={store}>
    <ActivityExpand data={eventTest} onExitFunc={() => { }} />
  </Provider>
);

describe("ActivityExpand", () => {
  // testing if it runs
  it("renders ActivityExpand", () => {
    mount(<ActivityExpandWrapper />);
  });
  // testing if it matches the previous snapshot
  it("Should match ActivityExpand snapshot", () => {
    const comp = mount(<ActivityExpandWrapper />);
    expect(toJSON(comp)).toMatchSnapshot();
  });
});

