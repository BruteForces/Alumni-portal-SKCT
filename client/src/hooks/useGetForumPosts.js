import { useCallback, useEffect, useState } from "react";
import useAxiosWithCallback from "./useAxiosWithCallback";
import useScrollPositionThrottled from "./useScrollPositionThrottled";

const useGetForumPosts = (user) => {
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getConfig = useCallback(
    (offset = 0) => ({
      url: user
        ? `/api/v1/forum/feed_v2_alpha?author=${user}`
        : `/api/v1/forum/feed_v2_alpha?offset=${offset}`,
    }),
    [user]
  );

  useEffect(() => {
    fetchData(getConfig(0), setPosts);
  }, [fetchData, getConfig]);

  useScrollPositionThrottled(
    ({ atBottom }) => {
      if (atBottom && hasMore) {
        fetchData(getConfig(posts.length), (newPosts) => {
          setPosts((prev) => [...prev, ...newPosts]);
          setHasMore(newPosts.length === 5);
        });
      }
    },
    null,
    []
  );

  return { isLoading, error, posts };
};

export default useGetForumPosts;
