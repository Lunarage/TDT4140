import { mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJSON from "enzyme-to-json";
import ActivityPreview from '../../components/ActivityPreview';
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

const ActivityPreviewWrapper = () => (
  <Provider store={store}>
    <ActivityPreview data={eventTest} onClickFunc={() => { }} />
  </Provider>
);

describe("ActivityPreview", () => {
  it("renders ActivityPreview", () => {
    mount(<ActivityPreviewWrapper />);
  });
  it("Should match ActivityPreview snapshot", () => {
    const comp = mount(<ActivityPreviewWrapper />);
    expect(toJSON(comp)).toMatchSnapshot();
  });
});

