from rest_framework import serializers
from .models import Post, HashTag
from likes.models import Like


class HashTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = HashTag
        fields = ['id', 'tag_name',]


class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    like_id = serializers.SerializerMethodField()
    comments_count = serializers.ReadOnlyField()
    likes_count = serializers.ReadOnlyField()
    tags = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=HashTag.objects.all()
    )

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(
                owner=user, post=obj
            ).first()
            return like.id if like else None
        return None


    def validate_image(self, value):
        if not isinstance(value, str):
            if value.size > 1024 * 1024 * 2:
                raise serializers.ValidationError(
                    'Image size is larger than 2MB!'
                )
            if value.image.width > 4096:
                raise serializers.ValidationError(
                    'Image width > 4096px'
                )
            if value.image.height > 4096:
                raise serializers.ValidationError(
                    'Image height > 4096px'
                )
        return value

    class Meta:
        model = Post
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'title',
            'content', 'image', 'is_owner', 'profile_id', 'profile_image',
            'image_filter', 'like_id', 'comments_count', 'likes_count',
            'tags'
        ]