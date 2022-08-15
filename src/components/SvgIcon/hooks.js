import { useEffect, useRef, useState } from 'react';

const useHooks = (props) => {
  const { name } = props;
  const importedIconRef = useRef(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    let mounted = true;

    const importIcon = async () => {
      try {
        importedIconRef.current = (
          await import(
          '!!@svgr/webpack?-svgo,+titleProp,+ref!icons/' + name + '.svg'
            )
        ).default;
      } catch (err) {
        importedIconRef.current = null;
      }
    };

    importIcon().then(() => {
      if (mounted) {
        setLoading(false);
      }
    });

    return () => (mounted = false);

  }, [name]);

  return {
    refs: {
      importedIconRef,
    },
    states: {
      loading,
    },
  };
};

export default useHooks;
