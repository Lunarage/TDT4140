import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  border-style: solid;
  border-color: black;
`;

const ActivityPreview = () => (
  <Wrapper>
    <div> Activity Preview </div>
    <div> \._./</div>
  </Wrapper>
);

export default ActivityPreview
