import { useAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000/api";

export function useApi() {
  const { getToken } = useAuth();

  const fetchWithAuth = useCallback(
    async (path: string, options: RequestInit = {}) => {
      const token = await getToken();
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}${path}`, { ...options, headers });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error || res.statusText);
      }
      return res.json();
    },
    [getToken]
  );

  return {
    get: (path: string) => fetchWithAuth(path),
    post: (path: string, body: object) =>
      fetchWithAuth(path, { method: "POST", body: JSON.stringify(body) }),

    syncUser: () => fetchWithAuth("/users/sync", { method: "POST" }),
    getCommunities: () => fetchWithAuth("/communities"),
    getPosts: (community?: string) =>
      fetchWithAuth(community ? `/posts?community=${community}` : "/posts"),
    createPost: (data: {
      title: string;
      body?: string;
      communityId: string;
      isPoll?: boolean;
      pollOptions?: string[];
    }) => fetchWithAuth("/posts", { method: "POST", body: JSON.stringify(data) }),
    votePost: (postId: string, value: 1 | -1) =>
      fetchWithAuth(`/posts/${postId}/vote`, {
        method: "POST",
        body: JSON.stringify({ value }),
      }),
    votePoll: (postId: string, optionId: string) =>
      fetchWithAuth(`/posts/${postId}/poll-vote`, {
        method: "POST",
        body: JSON.stringify({ optionId }),
      }),
    addComment: (postId: string, content: string) =>
      fetchWithAuth(`/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify({ content }),
      }),
    getPolls: () => fetchWithAuth("/polls"),
  };
}
