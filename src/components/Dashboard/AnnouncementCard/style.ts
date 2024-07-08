import styled from 'styled-components';

export const StyledProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin-top: 10px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ avisosPercent: number; eventosPercent: number }>`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(to right, #ffab91, #64b5f6);
  transition: width 0.5s ease-in-out;
  width: ${({ avisosPercent, eventosPercent }) =>
    `calc(${avisosPercent}% + ${eventosPercent}%)`};
`;

export const ProgressBarSegment = styled.div<{ percent: number; color: string }>`
  height: 100%;
  width: ${({ percent }) => `${percent}%`};
  background-color: ${({ color }) => color};
`;
