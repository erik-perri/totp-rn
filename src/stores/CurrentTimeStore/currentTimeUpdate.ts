import useCurrentTimeStore from '../useCurrentTimeStore';

export default function currentTimeUpdate() {
  useCurrentTimeStore.setState({currentTime: Date.now()});
}
